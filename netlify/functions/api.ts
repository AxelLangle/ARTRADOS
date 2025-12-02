import serverless from "serverless-http";

import { createServer } from "../../server";

export const handler = serverless(createServer(), {
  binary: true,
  request(request: any, _event: any, _context: any) {
    // Ensure proper handling of file uploads and multipart form data
    return request;
  },
});
