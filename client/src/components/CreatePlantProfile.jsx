import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles'; // now in autosuggest
// import MenuItem from '@material-ui/core/MenuItem'; // now in autosuggest
// import TextField from '@material-ui/core/TextField'; // now in autosuggest
import API_URL from '../../../config'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import config from '../../../config';
import {render} from 'react-dom'; // added for downshift
import Downshift from 'downshift'; // added for downshift
// added for react-autosuggest
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles'

// END added for react-autosuggest

// const NewFandV = require('../../../NewFAndV');

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
// for OLD drop down list
// const currenciesOLD = [
//   {
//     value: 'Strawberries',
//     label: 'Strawberries',
//   },
//   {
//     value: 'Oranges',
//     label: 'Oranges',
//   },
//   {
//     value: 'Figs',
//     label: 'Figs',
//   },
//   {
//     value: 'Tomatoes',
//     label: 'Tomatoes',
//   },
//   {
//     value: 'Squash',
//     label: 'Squash',
//   },
//   {
//     value: 'Rosemary',
//     label: 'Rosemary',
//   },
//   {
//     value: 'Snap Peas',
//     label: 'Snap Peas',
//   },
//   {
//     value: 'Apples',
//     label: 'Apples',
//   },
//   {
//     value: 'Basil',
//     label: 'Basil',
//   },
//   {
//     value: 'Peaches',
//     label: 'Peaches',
//   },
// ];
const currencies = [{
  Apples: 'https://i.imgur.com/VWk0EHqh.jpg',
  Apricot: 'https://i.imgur.com/9Xv87cDh.jpg',
  Artichoke: 'https://i.imgur.com/Fir9Czch.jpg',
  Arugula: 'https://i.imgur.com/tV6bWixh.jpg',
  Bananas: 'https://i.imgur.com/XxL6baYh.jpg',
  Beans: 'https://i.imgur.com/UWr8qiRh.jpg',
  Blueberries: 'https://i.imgur.com/SGlygBCh.jpg',
  'Bok Choy': 'https://i.imgur.com/flkU578h.jpg',
  Broccoli: 'https://i.imgur.com/rc5y4tKh.jpg',
  'Brussel Sprouts': 'https://i.imgur.com/IEhPjjJh.jpg',
  Cabbage: 'https://i.imgur.com/SYUmqEqh.jpg',
  Cauliflower: 'https://i.imgur.com/XN4JXmVh.png',
  Celery: 'https://i.imgur.com/M4mtnuth.jpg',
  Cherries: 'https://i.imgur.com/pNhAoNdh.jpg',
  'Chile Peppers': 'https://i.imgur.com/meQyn3jh.jpg',
  'Collard Greens': 'https://i.imgur.com/BLA5Jveh.jpg',
  Corn: 'https://i.imgur.com/mi1TRHbh.jpg',
  Cucumber: 'https://i.imgur.com/jnNOahTh.jpg',
  Dewberry: 'https://i.imgur.com/fgRXi2Xh.jpg',
  Dill: 'https://i.imgur.com/uLa4koEh.jpg',
  'Elephant Fruit': 'https://i.imgur.com/uCapFRJh.jpg',
  Peas: 'https://i.imgur.com/3omJ6Dkh.jpg',
  'Escarole Lettuce': 'https://i.imgur.com/T80eHJPh.png',
  Fig: 'https://i.imgur.com/KSITPcoh.jpg',
  Garlic: 'https://i.imgur.com/G7ql5gch.jpg',
  Grapes: 'https://i.imgur.com/Z2RkzoYh.jpg',
  Honeydew: 'https://i.imgur.com/EBAG2HXh.jpg',
  Kiwi: 'https://i.imgur.com/5fIk7nbh.jpg',
  Leeks: 'https://i.imgur.com/cSzDYFfh.jpg',
  Mango: 'https://i.imgur.com/THfmOcZh.jpg',
  Mushrooms: 'https://i.imgur.com/txxOeI6h.jpg',
  Noni: 'https://i.imgur.com/MDa7epQh.jpg',
  Okra: 'https://i.imgur.com/RZO2RVMh.jpg',
  Olive: 'https://i.imgur.com/Yuud9Vrh.jpg',
  Oregano: 'https://i.imgur.com/t9dH9Cdh.jpg',
  Parsley: 'https://i.imgur.com/9eRh3ohh.jpg',
  Parsnip: 'https://i.imgur.com/OJI7nN9h.jpg',
  Peach: 'https://i.imgur.com/I6Qij5fh.jpg',
  Pineapple: 'https://i.imgur.com/vZ0sFH7h.jpg',
  Pumpkins: 'https://i.imgur.com/xCVsN2Wh.jpg',
  Quince: 'https://i.imgur.com/b8pYNLCh.jpg',
  Radicchio: 'https://i.imgur.com/jH9e8dgh.jpg',
  Radishes: 'https://i.imgur.com/mN2b6a9h.jpg',
  Rambutan: 'https://i.imgur.com/pcCy6Zmh.png',
  Raspberry: 'https://i.imgur.com/m1AwCIhh.jpg',
  Rosemary: 'https://i.imgur.com/qB4w42Bh.jpg',
  Rutabagas: 'https://i.imgur.com/ecOahpmh.jpg',
  Sage: 'https://i.imgur.com/EzHuv6eh.jpg',
  Shallots: 'https://i.imgur.com/XEDKe6Zh.jpg',
  Strawberries: 'https://i.imgur.com/XbgKeGlh.jpg',
  Squash: 'https://i.imgur.com/InFdzqFh.jpg',
  'Sweet Potatoes': 'https://i.imgur.com/CFfgmJLh.jpg',
  Thyme: 'https://i.imgur.com/8rfdjlSh.jpg',
  Pears: 'https://i.imgur.com/QFH6lVZh.jpg',
  Zucchini: 'https://i.imgur.com/pNHF6S6h.jpg',
}];

class PlantProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // type: '',
      username: props.username,
      currency: 'Select',
      address: 'ADDRESS HERE',
      description: '',
      image: '',
      loggedIn: false,
    };
    this.getPlantType = this.getPlantType.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
    this.submitPlant = this.submitPlant.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setState = this.setState.bind(this);
    // this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }


  // function that sets state via onchange
  // allows us to grab the plant type and description
  onChange(event) {
    // find out if descrip field is being used
    if (event.target.id === 'description') {
      this.setState({
        description: event.target.value,
      });
    }
  }
  // !!!!! DISABLED TEMPORARILY !!!! no endpoint for /plant/category
  // get req to server to grab correct image based on selected type
  // getPlantType() {
  //   axios.get(`/plant/category?category=${this.state.currency}`) // currency is plant type
  //     .then((res) => {
  //       console.log(res);
  //       const plantImage = res.data[0];
  //       this.setState({ image: plantImage }); // this is not working yet
  //     });
  // }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value, // this is for the plant type dropdown... it works...
      });
    };
  }


  ////////////////// THESE FUNCTIONS ARE USED TO ENABLE USER IMAGE UPLOAD ////////////////
  ///// which does not currently work /////////////
  //// another option would be to grab plant images from a plant api /////////////

  // function allows users to upload image
  fileSelectHandler(event) {
    const currentImage = event.target.files[0];

    this.setState({
      image: currentImage,
    });
  }

  // function upload image to our server
  // fileUploadHandler() {
  //   const fd = new FormData();
  //   fd.append('image', this.state.image, this.state.image.name);

  //   const fr = new FileReader();
  //   const file = this.state.image;
  //   // fr.readAsBinaryString(file);
  //   // fr.readAsDataURL(file); //base64

  //   const params = {
  //     image: fr.readAsBinaryString(file), // this needs to be binary, base64 data, or a url
  //     // type: 'application/file',
  //     headers: {
  //       Authorization: `Client-ID ${config.clientId} Bearer ${config.imgurKey}`, // this is correct
  //     },
  //   };

  //   // post request to imgur
  //   // goal: upload a user image and get back a url
  //   axios.post('https://api.imgur.com/3/image', params)
  //     .then((res) => {
  //       console.log(res.data.link);

  //       // set state to image url
  //       this.setState({
  //         image: res.data.link,
  //       });
  //     })
  //     .catch((err) => { console.log(err); });
  // }

  ////////////////////////////////////////////////////////////////////////////


  // function when submit button is pressed
  submitPlant() {
    const {
      username,
      address,
      zipcode,
      currency,
      description,
      image,
    } = this.state;

    // change state to redirect to myProfile

    // send post req to server to save new plant info in plants table
    // add plant to users profile page
    // need to send through userId, type, description, address, zipcode, image
    // axios.post('/plant/profile', { currency, description, image, username })
    axios({
      method: 'post',
      url: '/plant/user',
      data: {
        username: 'acreed1998' || this.state.username,
        currency: 'Apples' || this.state.currency,
        address: 'Pretend This String Is An Address' || this.state.address,
        zipcode: '70115' || this.state.zipcode,
        description: 'This is a description' || this.state.description,
      },
    })
      .then((res) => { console.log('CreatePlantProfile res: ', res); })
      .catch((err) => { console.log('CreatePlantProfile error: ', err); });

    // set state is async so needs a second to load
    setTimeout(() => {
      this.setState({
        redirect: true,
      });
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    if (redirect === true) {
      return <Redirect to={{ pathname: '/myProfile' }} />;
    }


    return (
      <div className="zip-body">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')} 
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your Plant Type"
            margin="normal"
            variant="outlined"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <form className={classes.container} noValidate autoComplete="off">

          <TextField
            id="description"
            label="description"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          />
        </form>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.submitPlant}
        >
                Submit
        </Button>
      </div>
    );
  }
}

// PlantProfile.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(PlantProfile);
