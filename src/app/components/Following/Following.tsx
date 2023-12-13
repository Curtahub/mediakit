import { abbreviateNumber } from "@/app/utils/utils";
export const Following = ({ following }: { following: number }) => {
  return (
    <div className="bg-white dark:bg-[#1A1B1E] rounded-2xl p-[32px]">
      <p className="text-[14px] font-semibold uppercase">Seguindo</p>
      <p className="text-[32px] font-bold uppercase text-[#CE2039]">
        {abbreviateNumber(following)}
      </p>
      <p className="text-[14px] font-normal max-w-[144px]">
        Número total de pessoas que o perfil segue
      </p>
    </div>
  );
};
