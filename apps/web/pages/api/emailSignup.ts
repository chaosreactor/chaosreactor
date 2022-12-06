import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || '';

import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

type Response = {
  success: boolean;
  email?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { email, firstName, lastName, pageUri } = req.body;

  if (typeof email !== 'string') {
    return res.status(400).json({ success: false });
  }

  try {
    const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'pending',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }

  res.status(200).json({ success: true, email });
};
