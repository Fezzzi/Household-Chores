import { clientApi } from "clientSrc/client-api";

export const getTestData = () => clientApi.get('test');
