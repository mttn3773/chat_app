import { IApiResponse, RequestProps } from "../interfaces/api.interface";

export const request = async ({
  url,
  method = "GET",
  headers = {},
  body,
}: RequestProps): Promise<IApiResponse> => {
  try {
    if (headers) {
      headers["Accept"] = "application/json, text/plain, */*";
      headers["Content-Type"] = "application/json";
    }
    body = JSON.stringify(body);
    const res = await fetch(url, {
      method,
      headers,
      body,
    });
    const data: IApiResponse = await res.json();
    return data;
  } catch (error) {
    return { success: false, errors: [{ msg: "Something went wrong" }] };
  }
};
