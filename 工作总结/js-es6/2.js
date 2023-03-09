import { f1, f2 } from './1';

const test = () => {
    f1 = f1 || function (a) {
        return a + 2;
    };
    f1();
}