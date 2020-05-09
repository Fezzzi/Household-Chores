import { config } from './config';
import axios from 'axios';

export const clientApi = axios.create(config);
