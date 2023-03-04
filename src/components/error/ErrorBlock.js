import errorBlokClass from './ErrorBlock.module.scss';
import { Alert } from 'antd';

function ErrorBlock() {
  return (
    <div className={errorBlokClass.error}>
      <Alert message="Something gone wrong, please reload the page." type="error" />
    </div>
  );
}
export default ErrorBlock;
