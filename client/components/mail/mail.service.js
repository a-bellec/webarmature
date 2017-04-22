'use strict';

export function MailService($http, $q) {
  'ngInject';

  let Mail = {

    /**
     *
     * @param name
     * @param email
     * @param text
     * @param callback
     */

    contactMail({
      name,
      email,
      text
    }) {
      return $http.post('/api/mails/contact', {
        name,
        email,
        text
      })
        .then(res => res)
        .catch(err => $q.reject(err.data));
    },


    /**
     *
     * @param name
     * @param occupation
     * @param occupationPlace
     * @param email
     * @param callback
     */

    signUpNotify({
      name,
      occupation,
      occupationPlace,
      email
    }) {
      return $http.post('/api/mails/signUpNotify', {
        name,
        occupation,
        occupationPlace,
        email
      })
        .then(res => res)
        .catch(err => $q.reject(err.data));
    }

  };

  return Mail;
}
