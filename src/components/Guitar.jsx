import { memo } from 'react';

const GuitarComponent = () => {
	return (
		<div>
			<img src='/images/guitar.png' />
		</div>
	);
};
const Guitar = memo(GuitarComponent);

export default Guitar;


// li{
//     display: block;
//     margin-bottom: 5px;
//     width: 100%;
//     background-color: #ba9;
//     background-image: repeating-linear-gradient(50deg, rgba(0, 0, 0, .6), transparent .15em, transparent .2em), linear-gradient(180deg, rgba(0, 0, 0, .3) 10%, hsla(0, 0%, 100%, .25) 15%, hsla(0, 0%, 100%, .8) 30%, hsla(0, 0%, 100%, .25) 45%, rgba(0, 0, 0, .6) 90%);
//   }
  
//   .e-string{
//     height: 6px;
//   }
  
//   .a-string{
//     height: 5px;
//   }