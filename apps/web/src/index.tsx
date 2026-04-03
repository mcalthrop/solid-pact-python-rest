/* @refresh reload */
import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';
import './index.css';
import { App } from './App.tsx';

const root: HTMLElement | null = document.getElementById('root');
if (!root) {
  throw new Error('Missing #root element');
}

render((): JSX.Element => <App />, root);
