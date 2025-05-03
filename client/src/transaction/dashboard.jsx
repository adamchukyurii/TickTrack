import Container from "react-bootstrap/esm/Container";
import TransactionListProvider from "./transaction-list-provider";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  return (
    <Container>
      <TransactionListProvider>
        <DashboardContent />
      </TransactionListProvider>
    </Container>
  );
}

export default Dashboard;
