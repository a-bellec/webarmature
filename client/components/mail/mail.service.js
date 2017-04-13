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
    }, callback)
    {
      return $http.post('/api/mails/contact', {
        name,
        email,
        text
      })
        .then(res => {
          return res;
        })
        .catch(err => {
          return $q.reject(err.data);
        });
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
    }, callback)
    {
      return $http.post('/api/mails/signUpNotify', {
        name,
        occupation,
        occupationPlace,
        email
      })
        .then(res => {
          return res;
        })
        .catch(err => {
          return $q.reject(err.data);
        });
    }

  };

  return Mail;
}
