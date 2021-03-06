// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { configurationIsSet, storeConfiguration } from 'src/lib/blockchain/configuration/configuration-storage';
import { accountIsSet, storeAccount } from 'src/lib/blockchain/configuration/account-storage';

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/**
 * Set development user account.
 * Set development blockchain RPC URI.
 * This is activated when application 
 * is run in development mode only.
*/
export const init = async () => {
  if (!(await accountIsSet())) {
    storeAccount({
      name: 'eosio',
      privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
    });
    console.log('[DEV] USER ACCOUNT WAS SET.');
  }
  if (!(await configurationIsSet())) {
    storeConfiguration({ rpcUri: 'http://localhost:8888', reliabilityThreshold: 50 });
    console.log('[DEV] CONFIG WAS SET.');
  }
}

export const variables = {
  /** 
   * Time period after report creation 
   * until it can be expired
   * NOTE: reduced to 10s for dev
   */
  holdPeriod: 10 * 1000,

  /** 
   * Time period after expiration
   * until it can be cleaned
   * NOTE: reduced to 10s for dev
   */
  freezePeriod: 10 * 1000
};
