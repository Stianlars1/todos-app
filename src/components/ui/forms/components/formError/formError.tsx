import { CSSProperties } from "react";
import "./css/formError.css";
export const FormError = ({
  errorArray,
  style,
}: {
  errorArray: string[] | undefined;
  style?: CSSProperties;
}) => {
  return (
    <>
      {errorArray !== undefined && errorArray.length > 0 && (
        <>
          <ul className="form-error-wrapper">
            {errorArray.map((error, index) => (
              <li style={style} key={index}>
                {error}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
