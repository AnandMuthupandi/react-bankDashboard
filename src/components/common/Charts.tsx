import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import BarChart from "../barChart/BarChart";
import PieChart from "../pieChart/PieChart";
import { CONSTANTS } from "../../utils/constants";
import { useApiContext } from "../../contexts/apicontext";
import { APIUtility } from "../../utils/apiutilities";
import { ChartProps, IClientAccounts } from "../../interfaces/types";
import EmptyAccounts from "./EmptyAccounts";
import LoadingWrapper from "./loading/LoadingWrapper";
import FilterCardType from "../filterCardType/FilterCardType";
import {
  preprocessAccountsData,
  preprocessClientAccountsData,
} from "../../utils/chartUtilities";

export default function Charts({ clientId, openModal }: ChartProps) {
  const { apiState, fetchData, apiDispatch } = useApiContext();
  const [clientAccounts, setClientAccounts] = useState<IClientAccounts[]>([]);
  const [cardTypes, setCardTypes] = useState<IClientAccounts[]>([]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [isShowLoading, setIsShowLoading] = useState(false);
  const accountsId = CONSTANTS.API.ACCOUNTS.ID;
  const clientAccountsAPIId = CONSTANTS.API.CLIENT_ACCOUNTS.ID;

  useEffect(() => {
    if (!apiState.apiState?.clientAccounts[clientId]) {
      setIsShowLoading(true);
      fetchData({
        url: APIUtility.generateApiUrl(
          CONSTANTS.API.CLIENT_ACCOUNTS.URL + clientId
        ),
        apiId: clientAccountsAPIId,
        options: APIUtility.apiGetOptions,
        successCallback: async (resp: IClientAccounts[]) => {
          let accounts: IClientAccounts[] = [];
          if (apiState[accountsId] && apiState[accountsId].data) {
            accounts = preprocessAccountsData(apiState[accountsId].data);
          }
          const accountDetails: IClientAccounts[] =
            await preprocessClientAccountsData(resp, accounts);
          setClientAccounts(accountDetails);
          setCardTypes(accountDetails);
          setIsShowLoading(false);
          apiDispatch({
            type: CONSTANTS.ACTIONS.CLIENT_ACCOUNTS,
            clientId,
            resp,
          });
        },
      });
    } else if (apiState.apiState?.clientAccounts[clientId]) {
      setClientAccounts(apiState.apiState.clientAccounts[clientId]);
      setCardTypes(apiState.apiState.clientAccounts[clientId]);
    }
  }, [clientId]);

  const handlePieSegmentClick = (segment: string) => {
    setSelectedSegment(segment);
  };

  const handleModal = () => {
    openModal();
  };

  const filteredCardTypes = (cardType: any) => {
    const filteredItems = cardTypes.filter((card) => !cardType[card.id]);
    setClientAccounts(filteredItems);
  };

  if (cardTypes.length) {
    return (
      <>
        <LoadingWrapper
          isShowLoading={isShowLoading}
          component={
            <>
              <Grid item xs={4}>
                {cardTypes.length ? (
                  <PieChart
                    clientAccounts={cardTypes}
                    onSegmentClick={handlePieSegmentClick}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={4}>
                <FilterCardType
                  clientAccounts={cardTypes}
                  filteredCards={filteredCardTypes}
                />
                <div onClick={handleModal}>
                  <BarChart
                    clientAccounts={clientAccounts}
                    cardTypes={cardTypes}
                    selectedSegment={selectedSegment}
                  />
                </div>
              </Grid>
            </>
          }
        />
      </>
    );
  } else {
    return (
      <>
        <Grid item xs={8} justifyContent="center">
          <LoadingWrapper
            isShowLoading={isShowLoading}
            component={<EmptyAccounts />}
          />
        </Grid>
      </>
    );
  }
}
