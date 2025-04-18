"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setSelectionData,
  setCurrentStep,
  nextStep,
  previousStep,
  setIsNextStepDisabled,
} from "../../slices/selectionSlice";
import { RootState, AppDispatch } from "../../store/store";
import Steps from "../../_components/stepper";
import { useStepsData } from "../../data/data";
import CardElement from "../../_components/card";
import ButtonElement from "../../_components/Elements/buttonElement";
import DynamicTabs from "../../_components/tabs";
import IconHolder from "../../_components/iconHolder";
import ClearButton from "../../_components/Elements/clearButton";
import CounterButton from "../../_components/Elements/counterButton";
import useOrientationCheck from "../../utilities/checkOrientation";
import RotatePage from "../../_components/rotatePage";
import DragDropArea from "../../_components/dragDropElement";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import AlertElement from "~/app/_components/Elements/AlertElement";
import { clearCartItem, hideCanvasBorder } from "../../slices/cartSlice";
import OrderSummary from "../../_components/orderSummary";
import {
  resetTotalOccupiedSize,
  sendPanelDetailsEmail,
} from "../../slices/extraSlice";
import CompleteOrderModal from "~/app/_components/completeOrdermodal";
import { generateOrderPdf } from "~/app/_components/generateOrderPdf";

const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectionData = useSelector(
    (state: RootState) => state.selectionData.selectionData,
  );
  const currentStep = useSelector(
    (state: RootState) => state.selectionData.currentStep,
  );
  const isNextDisabled = useSelector(
    (state: RootState) => state.selectionData.isNextDisabled,
  );
  const isPrevDisabled = useSelector(
    (state: RootState) => state.selectionData.isPrevDisabled,
  );
  const cartData = useSelector((state: RootState) => state.cartData.cartData);
  const totalPrice = useSelector(
    (state: RootState) => state.cartData.totalPrice,
  );
  const totalQty = useSelector((state: RootState) => state.cartData.quantity);
  const logoUrl = useSelector((state: RootState) => state.extraSlice.logoUrl);
  const options = currentStep?.options;
  const optionTypes = currentStep?.optionTypes;
  const optionsData = currentStep?.optionsData;

  const isPortrait = useOrientationCheck();
  const [selectedOptionType, setSelectedOptionType] = useState<
    string | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState(false);
  const isMobile = () => {
    return typeof window !== "undefined" && "ontouchstart" in window;
  };

  const stepsData = useStepsData();

  useEffect(() => {
    if (stepsData.length > 0) {
      dispatch(setSelectionData(stepsData));
    }
  }, [dispatch, JSON.stringify(stepsData)]);

  useEffect(() => {
    if (Array.isArray(optionTypes) && optionTypes.length > 0) {
      setSelectedOptionType(optionTypes[0]);
    }
  }, [optionTypes]);

  useEffect(() => {
    if (selectionData.length > 0) {
      dispatch(setCurrentStep(selectionData[0]));
    }
  }, [dispatch, selectionData]);

  const handleOptionTypeChange = (optionType: string) => {
    setSelectedOptionType(optionType);
  };

  const selectedOptions =
    (Array.isArray(optionsData) ? optionsData : []).find(
      (data: any) => data.optionType === selectedOptionType,
    )?.options || [];

  // Invoked when Clear Button Clicked
  const handleClearItem = () => {
    dispatch(clearCartItem(currentStep.step));
    if (currentStep.stepNo <= 4) {
      dispatch(setIsNextStepDisabled(true));
    }
    if (currentStep.stepNo === 4) {
      dispatch(resetTotalOccupiedSize());
    }
    if (currentStep.stepNo === 7) {
      // Reset Step to 0
      // Clear All
      if (selectionData.length > 0) {
        dispatch(setCurrentStep(selectionData[0]));
        dispatch(setIsNextStepDisabled(true));
      }
    }
  };

  // Invoked after user Enters Email and Clicks Done in Complete Modal
  const handleCompleteOrder = async (userName: string, userMail: string) => {
    // Generating Order Pdf
    await generateOrderPdf({
      logoUrl: logoUrl,
      email: userMail,
      userName: userName,
      totalQty: totalQty,
      finalPrice: totalPrice,
    });
    // Invoking Email Api
    // if (cartData) {
    //     dispatch(sendPanelDetailsEmail({ panelData: cartData, recipientEmail: userMail }))
    // }
  };

  return (
    <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
      <>
        {isPortrait ? (
          <RotatePage />
        ) : (
          <div className="flex min-h-[500px] flex-col">
            {/* Rendering Top Text with Stepper Components */}
            <Steps />

            {/* Rendering Card Options */}
            <div className="flex-1">
              <>
                {optionsData && (
                  <div className="mb-5">
                    <DynamicTabs
                      optionTypes={optionTypes}
                      onOptionTypeChange={handleOptionTypeChange}
                    />
                  </div>
                )}

                {options && (
                  <div className="app-grey inline-flex flex-wrap justify-center gap-3 rounded-xl p-1">
                    {/* Rendering the first group of Selection Cards */}
                    {options.map((ele: any, index: number) => (
                      <CardElement
                        key={ele.id}
                        data={ele}
                        currentOptionType={selectedOptionType}
                      />
                    ))}
                  </div>
                )}

                {currentStep.stepNo > 3 && (
                  <div className="flex sm:flex-col sm:gap-5 xl:flex-row xl:gap-10">
                    {currentStep.stepNo !== 7 && (
                      /* Hide Cards on Last Step(Cart) */
                      <div className="flex-none xl:w-1/3">
                        {currentStep.stepNo !== 5 ? (
                          /* Rendering Small Cards */
                          <div className="app-grey inline-flex flex-wrap justify-center gap-2 rounded-xl p-1">
                            {selectedOptions.length > 0 &&
                              selectedOptions.map((option: any, index: any) => (
                                <CardElement
                                  key={option.id}
                                  data={option}
                                  currentOptionType={selectedOptionType}
                                  small
                                />
                              ))}
                          </div>
                        ) : (
                          /* Rendering Icons */
                          <div
                            className="app-grey mt-3 inline-flex flex-wrap justify-center gap-3 rounded-xl p-1"
                            draggable={false}
                          >
                            {selectedOptions.length > 0 &&
                              selectedOptions.map((option: any, index: any) => (
                                <IconHolder
                                  key={option.id}
                                  data={option}
                                  currentOptionType={selectedOptionType}
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                    {currentStep.stepNo > 3 && <DragDropArea />}
                    {currentStep.stepNo === 7 && <OrderSummary />}
                  </div>
                )}
              </>
            </div>

            {/* Rendering Amount and Next Previous Buttons */}
            <div className="flex flex-row items-center justify-between p-4">
              <div className="text-2xl font-bold text-green-700">
                {currentStep.stepNo > 6 && (
                  <>
                    <strong>₹</strong> <span>{totalPrice}</span>
                  </>
                )}
              </div>
              {/* Rendering Clear Button */}
              <ClearButton
                onClick={handleClearItem}
                msg={`${
                  currentStep.stepNo === 7
                    ? "Do you want to clear All selection?"
                    : "Do you want to clear the selection?"
                }`}
              />

              {currentStep.stepNo > 6 && <CounterButton />}
              <div className="flex justify-end space-x-4">
                <>
                  <ButtonElement
                    label={`Back`}
                    onClick={() => dispatch(previousStep())}
                    disabled={isPrevDisabled}
                    variant="secondary"
                    size="medium"
                  />
                  <ButtonElement
                    label={currentStep.stepNo > 6 ? `Complete Order` : `Next`}
                    onClick={() =>
                      currentStep.stepNo > 6
                        ? setOpenModal(true)
                        : dispatch(nextStep(cartData)) &&
                          currentStep.stepNo > 5 &&
                          dispatch(hideCanvasBorder())
                    }
                    disabled={isNextDisabled}
                    variant="primary"
                    size="medium"
                  />
                </>
              </div>
            </div>
            <AlertElement />
            <CompleteOrderModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              onSubmit={handleCompleteOrder}
            />
          </div>
        )}
      </>
    </DndProvider>
  );
};
export default UserDashboard;
