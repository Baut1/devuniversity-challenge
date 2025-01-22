import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  onError(req, res, error) {
    res.status(error.status || 500).end(error.message);
  },
});
