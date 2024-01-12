import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FlagInput from "../auth/FlagInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkSubmittedFlag } from "@/redux/features/challengeSlice";
import { useState } from "react";

const formSchema = z.object({
  flag: z.string().regex(/^DEFENSYS\{.*\}$/, {
    message: "Invalid flag format. Must start with DEFENSYS{ and end with }",
  }),
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = {};

export default function FlagSubmitForm({}: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeChallenge } = useAppSelector((state) => state.challenge);
  const [flagSubmitResponse, setFlagSubmitResponse] = useState("");
  const [istheFlagCorrect, setIstheFlagCorrect] = useState(false);
  // const values = {
  //   token: user.token,
  //   challengeId: activeChallenge._id,
  //   userId: user._id,
  // };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    let res = await dispatch(
      checkSubmittedFlag({
        token: user.token,
        flag: data.flag,
        challengeId: activeChallenge._id,
        userId: user._id,
      })
    );
    if (res.type === "challenge/checkFlag/fulfilled") {
      setIstheFlagCorrect(res.payload);
    }
    setFlagSubmitResponse(res.payload);

    console.log("response : ", res);
  };

  return (
    <div className="flex flex-col mb-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlagInput
          name="flag"
          type="text"
          placeholder="Flag"
          register={register}
          error={errors?.flag?.message}
        />
      </form>
      <div className=""></div>
    </div>
  );
}
