# redsys-inline-angular

This component load a redsys credit card inSite using a messaged iframe. 

For use Redsys test environment, 8080 port is mandatory in localhost because domain will be blocked by Redsys if using default port (4200),

The remote content loaded inside the iframe listen and post a messages to implement a functional protocol with our side, but redsys not send to us a "loaded" message, for this reason is needed a timeout for wait and init the protocol.

### how to use

I dont make a module, or library because,  if you want you can inspire, copy and paste component code for made your own implementations.
This code is autonomous and independent to 3rd party code or libraries.

## Constants

* REDSYS_DOMAIN = 'https://sis-t.redsys.es:25443'; // for test using test merchant code

* REDSYS_DOMAIN = 'https://sis-t.redsys.es'; // for real using your merchant code


## Inputs

 * orderId: string = Math.round(Math.random() * 10000).toString();  // your orderId
 * language:string = "es"; // iso 
 * styleButton: string = ""; // string, support direct css styles in one line
 * styleBody: string = "";// string, support direct css styles in one line
 * styleBox: string = ""; // string, support direct css styles in one line
 * styleBoxText: string = ""; // string, support direct css styles in one line
 * buttonValue: string = "Pay now"; // text for button
 * fuc: string = "999008881"; // your merchant code 999008881 for test/dev environment
 * terminal: string = "001";  // your terminal id 001 by default

## Outputs

* onSuccess 
    * when card is valid, onSuccess emit a string with token to next step, you must be send this token to your server side for get a signed message to post on Redsys Rest Api whitout server side conections if you preffer
    [https://pagosonline.redsys.es/conexion-rest.html]
* onError
    * when card is not valid, emit a original redsys message code (string)
    [https://pagosonline.redsys.es/conexion-insite.html]

