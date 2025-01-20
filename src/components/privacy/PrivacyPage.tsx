"use client";

import { useSectionContext } from "@/contexts/section";
import Container from "../layout/Container";
import { useEffect } from "react";

const PrivacyPage = () => {
  const { setSection } = useSectionContext();

  useEffect(() => {
    setSection("privacy");
  }, []);

  return (
    <Container>
      <div className="text-black flex flex-col gap-6 text-justify text-[14px] md:text-[16px] p-2 md:p-0">
        <div className="flex flex-col gap-4">
          <h2 className="font-interMedium text-[14px] md:text-[16px]">
            Política de Privacidade
          </h2>
          <div className="indent-4 flex flex-col gap-3">
            <p>
              A sua privacidade é importante para nós. É política do Minerva
              respeitar a sua privacidade em relação a qualquer informação sua
              que possamos coletar no site{" "}
              <a
                className="text-roxominerva"
                href="https://minerva-gamma.vercel.app"
              >
                Minerva
              </a>
              , e outros sites que possuímos e operamos.
            </p>
            <p>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.
            </p>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </p>
            <p>
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <p>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade .
            </p>
            <p>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </p>
            <p>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto connosco.
            </p>
          </div>
          <div className="pl-5 ">
            <ul className="list-disc flex flex-col gap-3">
              <li>
                O serviço Google AdSense que usamos para veicular publicidade
                usa um cookie DoubleClick para veicular anúncios mais relevantes
                em toda a Web e limitar o número de vezes que um determinado
                anúncio é exibido para você.
              </li>
              <li>
                Para mais informações sobre o Google AdSense, consulte as FAQs
                oficiais sobre privacidade do Google AdSense.
              </li>
              <li>
                Utilizamos anúncios para compensar os custos de funcionamento
                deste site e fornecer financiamento para futuros
                desenvolvimentos. Os cookies de publicidade comportamental
                usados ​​por este site foram projetados para garantir que você
                forneça os anúncios mais relevantes sempre que possível,
                rastreando anonimamente seus interesses e apresentando coisas
                semelhantes que possam ser do seu interesse.
              </li>
              <li>
                Vários parceiros anunciam em nosso nome e os cookies de
                rastreamento de afiliados simplesmente nos permitem ver se
                nossos clientes acessaram o site através de um dos sites de
                nossos parceiros, para que possamos creditá-los adequadamente e,
                quando aplicável, permitir que nossos parceiros afiliados
                ofereçam qualquer promoção que pode fornecê-lo para fazer uma
                compra.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-interMedium">Compromisso do Usuário</h3>
          <p className="indent-4">
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o Minerva oferece no site e com caráter enunciativo,
            mas não limitativo:
          </p>
          <ul className="flex flex-col gap-3 list-disc pl-5">
            <li>
              A) Não se envolver em atividades que sejam ilegais ou contrárias à
              boa fé a à ordem pública;
            </li>
            <li>
              B) Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica, kiwibet ou azar, qualquer tipo de pornografia ilegal,
              de apologia ao terrorismo ou contra os direitos humanos;
            </li>
            <li>
              C) Não causar danos aos sistemas físicos (hardwares) e lógicos
              (softwares) do Minerva, de seus fornecedores ou terceiros, para
              introduzir ou disseminar vírus informáticos ou quaisquer outros
              sistemas de hardware ou software que sejam capazes de causar danos
              anteriormente mencionados.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-interMedium">Mais informações</h3>
          <p className="indent-4">
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso site.
          </p>
          <p className="text-center pt-4">
            Esta política é efetiva a partir de 20 de Janeiro de 2025
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPage;
