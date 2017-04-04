'use strict';

export function MailService($http) {
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
      return $http.post('/sayHello', {
        name,
        email,
        text
      });
    }

  };

  return Mail;
}
