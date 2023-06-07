import { Routes, Route } from "react-router-dom";
// Finance Business Entity
import BusinessEntityPage from './modules/finance-business-entity/components/business-entity/business-entity-page';
import ProductGroupPage from './modules/finance-business-entity/components/product-group/product-group-page';
import PaymentGatewayPage from './modules/finance-business-entity/components/payment-gateway/payment-gateway-page';
import BankAccountPage from './modules/finance-business-entity/components/bank-account/bank-account-page';

function AppRoutes () {  
    return (
        <Routes>
            <Route path="/business-entity" element={<BusinessEntityPage/>} />
            <Route path="/product-group/:id" element={<ProductGroupPage/>} />
            <Route path="/bank-account/:id" element={<BankAccountPage/>} />
            <Route path="/payment-gateway/:id" element={<PaymentGatewayPage/>} />
        </Routes>
    )
}

export default AppRoutes;