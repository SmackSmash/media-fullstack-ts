import prod from './prod';
import dev from './dev';

export default process.env.NODE_ENV === 'production' ? prod : dev;
