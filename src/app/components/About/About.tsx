type AboutProps = {
  description?: string;
};

export const About = ({ description }: AboutProps) => {
  return (
    <div className="flex flex-1 flex-col p-[32px] bg-white dark:bg-[#1A1B1E] rounded-2xl">
      <p className="text-[14px] font-semibold mb-[24px] uppercase dark:text-white">
        Sobre
      </p>
      <p className="text-[14px] font-normal text-justify dark:text-[#D9D9D9]">
        {description}
      </p>
    </div>
  );
};
