import https from 'https';
import fs from 'fs';

const ids = [
  '1HfmOOl_QvHepT1IOBCQm6jxfDihCrxH-',
  '1GsyqNdaOgNdRHOikOZQiqBOSGmmkou1I',
  '1X3-3LaGyqEE4tO0Btzcv6eABEOupbZWa',
  '1V468f021MgFRW_oIr5rPwf_g-fh-z7Xg',
  '1nuvnWOovR5idCBNVocsm9Ht90Ruqe6d5',
  '1VLCAuGWL6-JNqNGUAI3Y3GyvV1LHv7Q_',
  '11kDJ2bdn8mj2y1A6rUeinihlxgiy4MgB',
  '1sYZTEdbZ5Eoi49cYwK-voE5jZGOBkoJh',
  '13hLsQT0IGLtBqXG1PbkoURQw5f385t3p',
  '1zTMKIHhhRfdNIGcMKIKy3fWyJeTpIzSg',
  '11gLjZE79BOrRbYf8pP6DW9RAhRcO2Tq5',
  '1qU76zPzR-HUrDOdYNz28Ay6X7qFrX33e',
  '1bWGmW2D_L23fc12ZfOf1WZX-nyNIN8VP',
  '1oBAFS0E8g0knMK6i8S6g_BwiKlgBgSqm',
  '16TvNNpZ1A0k8f75_vFY2M7GcfWcZCgzL',
  '1QvzG8AB-6y8RnI6_0AAKkQWJqdHnYZLe'
];

async function checkId(id: string) {
  return new Promise((resolve) => {
    const url = `https://drive.google.com/uc?id=${id}&export=download`;
    https.request(url, { method: 'HEAD' }, (res) => {
      const cd = res.headers['content-disposition'];
      const cl = res.headers['content-length'];
      const location = res.headers['location'];
      resolve({ id, status: res.statusCode, cd, cl, location });
    }).on('error', (err) => {
      resolve({ id, error: err.message });
    }).end();
  });
}

async function run() {
  for (const id of ids) {
    const info = await checkId(id);
    console.log(info);
  }
}

run();
