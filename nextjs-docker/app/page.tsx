import { Container } from "@/components/layout/Container/Container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Container>
        <h1 className="flex align-center pt-[1rem] justify-center">
          Titre sous Tailwind
        </h1>
        <Button>Button</Button>
      </Container>
    </>
  );
}
