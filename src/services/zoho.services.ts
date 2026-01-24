import type { ZohoResponse } from "@/types/helpers.types";
import { env } from "@utils/env.server";
import { dataError } from "@utils/helpers.server";

interface TokenDetails {
  access_token: string;
  expires_in: number;
  created_at: number;
}

let tokenData: TokenDetails | null = null;
const TOKEN_EXPIRY_SEC = 60 * 5;

// Check if it takes less than 5 minutes for token to expire
const isTokenExpired = (created_at: number, expires_in: number) => {
  const ageInSec =
    Math.floor(Date.now() / 1000) - Math.floor(created_at / 1000);
  return ageInSec > expires_in - TOKEN_EXPIRY_SEC;
};

async function getAccessToken() {
  if (
    !tokenData ||
    isTokenExpired(tokenData.created_at, tokenData.expires_in)
  ) {
    const params = new URLSearchParams({
      client_id: env.ZOHO_CLIENT,
      client_secret: env.ZOHO_SECRET,
      grant_type: "refresh_token",
      refresh_token: env.ZOHO_REFRESH_TOKEN,
    });
    const res = await fetch(
      `https://accounts.zoho.com/oauth/v2/token?${params}`,
      { method: "POST" },
    );
    if (!res.ok) return null;
    const fetchedToken: { access_token: string; expires_in: number } =
      await res.json();
    tokenData = {
      access_token: fetchedToken.access_token,
      expires_in: fetchedToken.expires_in,
      created_at: Date.now(),
    };
    return tokenData.access_token;
  }

  return tokenData.access_token;
}

async function subscribeVisitor(email: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) return dataError("Access Token Error", 500);
  const params = new URLSearchParams({
    listkey: env.ZOHO_LISTKEY,
    resfmt: "JSON",
    contactinfo: JSON.stringify({ "Contact Email": email }),
    source: "Website",
  });
  const res = await fetch(
    `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?${params}`,
    {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  const data: ZohoResponse = await res.json();
  if (data.status === "error") {
    console.error(data);
    return dataError("Something went wrong. Try again later");
  }
  return data;
}

export { subscribeVisitor };
