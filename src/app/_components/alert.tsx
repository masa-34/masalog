import Container from "@/app/_components/container";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  if (!preview) {
    return null;
  }

  return (
    <div className="border-b bg-neutral-800 border-neutral-800 text-white dark:bg-slate-800">
      <Container>
        <div className="py-2 text-center text-sm">
          This page is a preview.{" "}
          <a
            href="/api/exit-preview"
            className="underline hover:text-teal-300 duration-200 transition-colors"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
};

export default Alert;
