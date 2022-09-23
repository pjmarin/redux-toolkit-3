import { LitElement, html } from 'lit';
// import { createStore } from 'redux';
import store from './redux/store.js';

// import { incrementOriginAmount, someAction, requestPostsSuccessfullyReceived } from './redux/actions/counter.actions.js';
import * as Actions from './redux/actions/counter.actions.js';

export class ReduxToolkitThirdTry extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
      defaultState: { type: Number },
      store: { type: Number },
      counter: { type: Number },
      valorVolcado: { type: String }
    }
  }

  constructor() {
    super();
    this.defaultState = store.getState().amount.originalAmount;
    this.valorVolcado = store.getState().testReducer.valueInput;
    this.posts = store.getState().amount.posts;
  }

  // eslint-disable-next-line class-methods-use-this
  increment() {
    // store.dispatch({ type: 'INCREMENT ORIGIN AMOUNT', data: { newAmount: 1 } });
    store.dispatch(Actions.incrementOriginAmount(1));
    
    store.dispatch(dispatch => {
      dispatch(Actions.someAction());

      setTimeout(() => dispatch(Actions.incrementOriginAmount(500)), 3000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  decrement() {
    store.dispatch(Actions.decrementOriginAmount(1));
  }

  // eslint-disable-next-line class-methods-use-this
  getPosts() {
    store.dispatch(dispatch => {
      dispatch({ type: 'REQUEST POSTS' });

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        this.posts = json;
        dispatch(Actions.requestPostsSuccessfullyReceived(json));

        store.subscribe(() => { 
          console.log('state', store.getState()); 
          this.posts = store.getState().amount.posts; 
          this.valorVolcado = store.getState().testReducer.valueInput;
        });
      });
    });
  }

  connectedCallback() {
    super.connectedCallback();

  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then((response) => response.json())
  //   .then((json) => {
  //     this.posts = json;
  //     console.log(json);
  //     store.subscribe(() => { console.log('state', store.getState()); this.defaultState = store.getState().originalAmount;});
  //   });

    store.subscribe(() => { console.log('state', store.getState()); this.defaultState = store.getState().amount.originalAmount;});
  }

  volcarValores() {
    const valueUpdated = this.shadowRoot.querySelector('#a').value;
    store.dispatch(Actions.mirrorInput(valueUpdated));
  }
  
  render() {
    return html`
      <div class="container">
        <h1>Contador</h1>
        <span class="contador">${this.defaultState}</span>
        <div>
          <label for="a">${this.valorVolcado}</label>
          <input type="text" id="a" />
        </div>
        <div class="container-buttons">
          <button @click="${this.increment}">increment</button>
          <button @click="${this.decrement}">decrement</button>
          <button @click="${this.getPosts}">get posts</button>
          <button @click="${this.volcarValores}">volcar valores</button>
        </div>
        <ul>
          ${this.posts ? this.posts.map(post => html`<li>${post.title}</li>`) : html`loading`}
        </ul>
      </div>
    `;
  }
}