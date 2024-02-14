import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FlagInput from "./FlagInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  checkSubmittedFlag,
  increaseChallengeSolves,
} from "@/redux/features/challengeSlice";
import { useState } from "react";
import { increaseUserSolves } from "@/redux/features/userSlice";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const userInfos = {
    userId: user._id,
    username: user.username,
  };

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
      setIstheFlagCorrect(true);
      dispatch(increaseChallengeSolves(userInfos));
      dispatch(increaseUserSolves(activeChallenge._id));
    } else {
      setIstheFlagCorrect(false);
    }

    setFlagSubmitResponse(res.payload);
    const timerId = setTimeout(() => {
      setFlagSubmitResponse("");
    }, 3000);
  };

  return (
    <div className="flex flex-col pr-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlagInput
          name="flag"
          type="text"
          placeholder="Flag"
          register={register}
          error={errors?.flag?.message}
          istheFlagCorrect={istheFlagCorrect}
          flagSubmitResponse={flagSubmitResponse}
        />
      </form>
      {flagSubmitResponse && (
        <div
          className={`${
            istheFlagCorrect ? "text-green-400" : "text-red-400"
          } text-[15px] mt-2`}
        >
          {flagSubmitResponse}
        </div>
      )}
    </div>
  );
}

// #E94F37 #0CCA4A
