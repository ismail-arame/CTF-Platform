import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FlagInput from "../auth/FlagInput";

const formSchema = z.object({
  flag: z.string().regex(/^DEFENSYS\{.*\}$/, {
    message: "Invalid flag format. Must start with DEFENSYS{ and end with }",
  }),
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = {};

export default function FlagSubmitForm({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlagInput
        name="flag"
        type="text"
        placeholder="Flag"
        register={register}
        error={errors?.flag?.message}
      />
    </form>
  );
}
