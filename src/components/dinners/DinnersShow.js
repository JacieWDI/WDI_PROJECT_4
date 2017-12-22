import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
import DinnerCommentForm from './DinnerCommentForm';

class DinnersShow extends React.Component {
  state = {
    dinner: {},
    comment: {
      body: ''
    }
  }

  componentWillMount() {
    Axios
      .get(`/api/dinners/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ dinner: res.data}, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

        deleteDinner = () => {
          Axios
            .delete(`/api/dinners/${this.props.match.params.id}`, {
              headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
            })
            .then(() => this.props.history.push('/'))
            .catch(err => console.log(err));
        }

  handleChange = ({ target: { name, value }}) => {
    const comment = Object.assign({}, this.state.comment, { [name]: value });
    this.setState({ comment });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(Auth.getToken());
    Axios
      .post(`/api/dinners/${this.props.match.params.id}/comments`, this.state.comment, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ dinner: res.data, comment: { body: '' } }), () => {
        console.log(this.state);
      })//ref to new state with historical comments
      .catch(err=> console.log(err));
  }

  //Add delete comment

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="page-banner col-md-12">
            <h1> Dinner </h1>
          </div>
        </div>
        <div className="row">
          <div className="image-tile col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <img src={this.state.dinner.image} className="img-responsive" />
          </div>
          <div className="col-md-6">
            <h3><span>{this.state.dinner.title}</span></h3>
            <h3>Number of places: <span>{this.state.dinner.avail_places}</span></h3>
            <h3>Description: <span>{this.state.dinner.description}</span></h3>
            <h3>Host: </h3> {this.state.dinner.createdBy && <Link to={`/users/${this.state.dinner.createdBy.id}`}><h3><span>{this.state.dinner.createdBy.name}</span></h3></Link>}

            { this.state.dinner.createdBy && Auth.isAuthenticated() && Auth.getPayload().userId === this.state.dinner.createdBy.id && <Link to={`/dinners/${this.state.dinner.id}/edit`} className="standard-button">Edit your dinner
            </Link>}
            {' '}
            { this.state.dinner.createdBy && Auth.isAuthenticated() && Auth.getPayload().userId === this.state.dinner.createdBy.id && <button className="delete-button" onClick={this.deleteDinner}>Delete your dinner
            </button>}
          </div>
        </div>
        <div className="row">
          <h3>Guests:</h3> { this.state.dinner.guests && this.state.dinner.guests.map(guest => {
            return(
              <div key={guest.id} >
                <h3><Link to={`/users/${guest.id}`}><strong><span> {guest.name}</span></strong></Link></h3>
              </div>
            );
          })}
          { this.state.dinner.createdBy && Auth.isAuthenticated() && Auth.getPayload().userId === this.state.dinner.createdBy.id && <Link to={`/dinners/${this.state.dinner.id}/edit`} className="standard-button">Edit your dinner
          </Link>}
          {' '}
          { this.state.dinner.createdBy && Auth.isAuthenticated() && Auth.getPayload().userId === this.state.dinner.createdBy.id && <button className="delete-button" onClick={this.deleteDinner}>Delete your dinner
          </button>}
        </div>

        {/* <div className="row">
          <h3>Comments:</h3>
          { this.state.dinner && this.state.dinner.guests && this.state.dinner.guests.map(guest => {
            return (
              <div key={guest.id} >
                <h3><Link to={`/users/${guest.id}`}><strong><span> {guest.name}</span></strong></Link></h3>

              </div>
            );
          })}
        </div> */}

        <div className="col-md-8">
          { this.state.dinner.comments && this.state.dinner.comments.map(comment => {
            return (
              <div key={comment.id}>
                <h3>Comments:</h3>
                <h4>Comment by: <span>{comment.createdBy.name}</span></h4>
                <img src={comment.createdBy.image} className="image-hp" />
                <p>{ comment.body }</p>
                <h4>Comment created at: <span>{ comment.createdAt }</span></h4>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-md-12">
            <DinnerCommentForm
              comment={this.state.comment}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}


export default DinnersShow;
