import {TuikeAccountApi} from './consts'
import request from 'umi-request';
import {requestTuikeApi} from './requests';

export async function requestVerificationCode(email) {
  return requestTuikeApi(TuikeAccountApi.REQUEST_VERIFICATION_CODE, {
    email: email
  });
}
