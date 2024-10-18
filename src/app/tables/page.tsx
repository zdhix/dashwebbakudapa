import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableFour from "@/components/Tables/TableFour";

export const metadata: Metadata = {
  title: "BAKUDAPA JO",
  description: "BAKUDAPA KANWIL",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
        <TableFour />
        {/* <TableFive /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
