import React from "react";
import Container from "../layout/Container";

const TermsOfUse = () => {
  return (
    <Container>
      <div className="text-black flex flex-col gap-6 text-justify">
        <div className="flex flex-col gap-2">
          <h2 className="font-interMedium">1. Termos</h2>
          <p className="indent-4">
            Ao acessar o site{" "}
            <a
              className="text-roxominerva"
              href="https://minerva-gamma.vercel.app"
            >
              Minerva
            </a>
            , concorda em cumprir estes termos de serviço, todas as leis e
            regulamentos aplicáveis ​​e concorda que é responsável pelo
            cumprimento de todas as leis locais aplicáveis. Se você não
            concordar com algum desses termos, está proibido de usar ou acessar
            este site. Os materiais contidos neste site são protegidos pelas
            leis de direitos autorais e marcas comerciais aplicáveis.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-interMedium">2. Uso de Licença</h2>
          <p className="indent-4">
            É concedida permissão para baixar temporariamente uma cópia dos
            materiais (informações ou software) no site Minerva , apenas para
            visualização transitória pessoal e não comercial. Esta é a concessão
            de uma licença, não uma transferência de título e, sob esta licença,
            você não pode:
          </p>
          <ol className="flex flex-col gap-2 list-disc pl-6">
            <li>modificar ou copiar os materiais;</li>
            <li>
              usar os materiais para qualquer finalidade comercial ou para
              exibição pública (comercial ou não comercial);
            </li>
            <li>
              tentar descompilar ou fazer engenharia reversa de qualquer
              software contido no site Minerva;
            </li>
            <li>
              remover quaisquer direitos autorais ou outras notações de
              propriedade dos materiais, ou transferir os materiais para outra
              pessoa ou 'espelhar' os materiais em qualquer outro servidor.
            </li>
          </ol>
          <p className="indent-4">
            Esta licença será automaticamente rescindida se você violar alguma
            dessas restrições e poderá ser rescindida por Minerva a qualquer
            momento. Ao encerrar a visualização desses materiais ou após o
            término desta licença, você deve apagar todos os materiais baixados
            em sua posse, seja em formato eletrónico ou impresso.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-interMedium">3. Isenção de responsabilidade</h2>
          <ol>
            <li>
              <p className="indent-4">
                Os materiais no site da Minerva são fornecidos "como estão".
                Minerva não oferece garantias, expressas ou implícitas, e, por
                este meio, isenta e nega todas as outras garantias, incluindo,
                sem limitação, garantias implícitas ou condições de
                comercialização, adequação a um fim específico ou não violação
                de propriedade intelectual ou outra violação de direitos.
              </p>
            </li>
            <li>
              <p className="indent-4">
                Além disso, o Minerva não garante ou faz qualquer representação
                relativa à precisão, aos resultados prováveis ​​ou à
                confiabilidade do uso dos materiais em seu site ou de outra
                forma relacionado a esses materiais ou em sites vinculados a
                este site.
              </p>
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-interMedium">4. Limitações</h2>
          <p className="indent-4">
            Em nenhum caso o Minerva ou seus fornecedores serão responsáveis
            ​​por quaisquer danos (incluindo, sem limitação, danos por perda de
            dados ou lucro ou devido a interrupção dos negócios) decorrentes do
            uso ou da incapacidade de usar os materiais em Minerva, mesmo que
            Minerva ou um representante autorizado da Minerva tenha sido
            notificado oralmente ou por escrito da possibilidade de tais danos.
            Como algumas jurisdições não permitem limitações em garantias
            implícitas, ou limitações de responsabilidade por danos conseqüentes
            ou incidentais, essas limitações podem não se aplicar a você.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-interMedium">5. Precisão dos materiais</h2>
          <p className="indent-4">
            Os materiais exibidos no site da Minerva podem incluir erros
            técnicos, tipográficos ou fotográficos. Minerva não garante que
            qualquer material em seu site seja preciso, completo ou atual.
            Minerva pode fazer alterações nos materiais contidos em seu site a
            qualquer momento, sem aviso prévio. No entanto, Minerva não se
            compromete a atualizar os materiais.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-interMedium">6. Links</h2>
          <p className="indent-4">
            O Minerva não analisou todos os sites vinculados ao seu site e não é
            responsável pelo conteúdo de nenhum site vinculado. A inclusão de
            qualquer link não implica endosso por Minerva do site. O uso de
            qualquer site vinculado é por conta e risco do usuário.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-interMedium">Modificações</h3>
          <p className="indent-4">
            O Minerva pode revisar estes termos de serviço do site a qualquer
            momento, sem aviso prévio. Ao usar este site, você concorda em ficar
            vinculado à versão atual desses termos de serviço.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-interMedium">Lei aplicável</h3>
          <p className="indent-4">
            Estes termos e condições são regidos e interpretados de acordo com
            as leis do Minerva e você se submete irrevogavelmente à jurisdição
            exclusiva dos tribunais naquele estado ou localidade.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default TermsOfUse;
