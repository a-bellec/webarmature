'use strict';

export function MailService($http, $q) {
  'ngInject';

  let Mail = {

    /**
     * Send contact mail
     *
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
          console.log("hmm?");
          return $q.reject(err.data);
        });
    }

  };

  return Mail;
}
