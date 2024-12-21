import {FormFields} from './index';
import {FormElementTypes} from './FormInputElement/constants';
import * as Yup from 'yup';

const createSchema = (fields: FormFields[]) => {
  const res: { [key: string]: any } = {};

  fields.map((each) => {
    switch (each.type) {
      case FormElementTypes.FLD_TYPE_TEXT:
      case FormElementTypes.FLD_TYPE_NUMBER:
      case FormElementTypes.FLD_TYPE_PHONE:
      case FormElementTypes.FLD_TYPE_TEXTAREA:
      case FormElementTypes.FLD_TYPE_RICH_TEXT:
        res[each.name] = each.required ? Yup.string().required(`${each.label || each.name} is required`) : Yup.string();
        break;

      case FormElementTypes.FLD_TYPE_AVATAR:
      case FormElementTypes.FLD_TYPE_FILE:
      case FormElementTypes.FLD_TYPE_FILES:
        res[each.name] = each.required ? Yup.mixed().required(`${each.label || each.name} is required`) : Yup.mixed();
        break;

      case FormElementTypes.FLD_TYPE_SLUG:
        res[each.name] = each.required ? Yup.string().required(`${each.label || each.name} is required`).matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid ${each.label || each.name} format`)
          : Yup.string().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid ${each.label || each.name} format`);
        break;

      case FormElementTypes.FLD_TYPE_EMAIL:
        res[each.name] = each.required ? Yup.string().email('Invalid email address').required(`${each.label || each.name} is required`) : Yup.string().email('Invalid email address');
        break;

      case FormElementTypes.FLD_TYPE_PASSWORD:
        res[each.name] = each.required ? Yup.string().required(`${each.label || each.name} is required`) : Yup.string();
        break;

      case FormElementTypes.FLD_TYPE_OPTION:
        res[each.name] = each.required ? Yup.mixed().test('required', `${each.label || each.name} is required`, (value: string) =>
          Boolean(each.options.find((option) => option?.value === value)),
        ) : Yup.mixed();
        break;

      case FormElementTypes.FLD_TYPE_OPTION_MULTI:
        res[each.name] = each.required ? Yup.array().min(1, `${each.label || each.name} is required`) : Yup.array();
        break;

      case FormElementTypes.FLD_TYPE_SWITCH:
        res[each.name] = Yup.boolean();
        break;

      case FormElementTypes.FLD_TYPE_DATE_TIME:
        res[each.name] = each.required ? Yup.date().required(`${each.label || each.name} is required`) : Yup.date();
        break;

      case FormElementTypes.FLD_TYPE_TIME:
        res[each.name] = each.required ? Yup.string().required(`${each.label || each.name} is required`) : Yup.string();
        break;

      case FormElementTypes.FLD_TYPE_AUTO_COMPLETE:
        res[each.name] = each.required ? Yup.object().required(`${each.label || each.name} is required`) : Yup.string();
        break;

      default:
        break;
    }
  });

  return res;
};

export default createSchema;
