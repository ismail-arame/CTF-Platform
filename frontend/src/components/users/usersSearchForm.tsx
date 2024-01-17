import { zodResolver } from "@hookform/resolvers/zod";
import UsersSearchInput from "./UsersSearchInput";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  user: z.string().regex(/^$|^[0-9a-zA-Z_ ]+$/, {
    message:
      "Only alphabetical characters, numbers, underscore and spaces are allowed.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
  users: any;
  setFilteredUsers: any;
};

export default function UsersSearchForm({ users, setFilteredUsers }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const { user: userQuery } = data;

    if (userQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      // If there is a search query, filter the users array based on the username
      setFilteredUsers(
        users.filter((user: any) =>
          user.username.toLowerCase().includes(userQuery.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
        <UsersSearchInput
          name="user"
          type="text"
          placeholder="Search for users"
          register={register}
          error={errors?.user?.message}
        />
      </form>
    </div>
  );
}
