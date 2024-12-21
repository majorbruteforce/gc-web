import SideDrawer from "./SideDrawer";
import FormElement, {FormFields} from "./FormElement";

const SideDrawerForm = ({
                          title,
                          defaultValue,
                          fields,
                          onSubmit,
                          buttonLabel,
                          open,
                          onClose
                        }: {
  title: string;
  defaultValue: any;
  fields: FormFields[];
  onSubmit?: (values: { [key: string]: any }, {reset}: { reset: any }) => Promise<any>;
  buttonLabel?: string;
  open: boolean;
  onClose: VoidFunction;
}) => {
  return (
    <SideDrawer title={title} open={open} onClose={onClose} width={320}>
      <FormElement
        defaultValue={defaultValue}
        fields={fields}
        onSubmit={onSubmit}
        submit={{label: buttonLabel, variant: 'contained', color: 'primary'}}
      />
    </SideDrawer>
  );
}

export default SideDrawerForm;
