import {sendEmail, Users} from "./emailer";

let message = `
<html>
<head>
<style>:root{
  --black: #111111;
  --darkyellow: #ebab34;
}

html {background-color: #111111;}

* {
  font-family: Helvetica;
  background: #111111;
  color: white;
}
.header {
  padding: 80px;
  text-align: center;
  background-color: #111111;
  color: white;
}
.header h1 {
  font-size: 40px;
}
div { padding: 20px;}
p {
  color: lightgray;
}

a:link {
  color: #ebab34;
}

/* visited link */
a:visited {
  color: darkolivegreen;
}

/* mouse over link */
a:hover {
  color: #ebab34;
}

/* selected link */
a:active {
  color: #ebab34;
}

/* also changes navbar*/
ul {

}
</style>
</head>
<div>
<h1>Check check check check</h1>
<p>pshhhhhhhhhhhhhzzzzzzzt</p>
<img src="https://assets.coingecko.com/coins/images/11860/large/photo_2021-06-24_00-48-28.jpg?1625495610" alt="" width="50px">
<a href="https://info.uniswap.org/#/tokens/0xfb130d93e49dca13264344966a611dc79a456bc5">Price Data on Random Coin</a>
</div>
</html>
`
sendEmail(Users.daylan, message);