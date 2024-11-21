import { loginHandler } from '../../../lib/login';

export async function POST(req) {
  return loginHandler(req);
}
