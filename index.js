const axios = require('axios');

const VALUE = process.env.VALUE;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const DNS_ZONE = process.env.DNS_ZONE;
const HOSTNAME = process.env.HOSTNAME;
const DOMAIN = process.env.DOMAIN;

const instance = axios.create({
  baseURL: `https://api.netlify.com/api/v1/dns_zones/${DNS_ZONE}/dns_records`,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

(async () => {
  try {
    const { data: all_records } = await instance.get();
    const service_record = all_records.find(
      (record) => record.hostname === `${HOSTNAME}.${DOMAIN}`,
    );

    // there is already a A record, delete it
    if (service_record) {
      await instance.delete(`/${service_record.id}`);
    }

    // add a new A record
    await instance.post('', {
      type: 'A',
      hostname: HOSTNAME,
      value: VALUE,
    });

    console.log("Success!!");
  } catch (error) {
    console.error(error);
  }
})();
