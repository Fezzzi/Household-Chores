import axios from 'axios';
import { config } from './config';

export const clientApi = axios.create(config);
