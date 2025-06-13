import { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import Modal from "./Modal";
import type { Token, SwapFormData } from "../types";
import { getTokensWithPrices } from "../services/tokenService";

export default function SwapForm() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<SwapFormData>({
    fromToken: null,
    toToken: null,
    fromAmount: "",
    toAmount: "",
  });
  const [errors, setErrors] = useState({
    fromAmount: "",
    general: "",
  });
  const [isSwapping, setIsSwapping] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"up" | "down" | null>(
    null
  );

  useEffect(() => {
    async function loadTokens() {
      try {
        const tokensWithPrices = await getTokensWithPrices();
        setTokens(tokensWithPrices);

        if (tokensWithPrices.length >= 2) {
          const ethToken = tokensWithPrices.find((t) => t.symbol === "ETH");
          const btcToken = tokensWithPrices.find((t) => t.symbol === "BTC");

          setFormData((prev) => ({
            ...prev,
            fromToken: ethToken || tokensWithPrices[0],
            toToken: btcToken || tokensWithPrices[1],
          }));
        }
      } catch (error) {
        console.error("Error loading tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTokens();
  }, []);

  // Calculate exchange rate and update toAmount when fromAmount, fromToken, or toToken changes
  useEffect(() => {
    const { fromToken, toToken, fromAmount } = formData;

    if (
      fromToken &&
      toToken &&
      fromToken.price &&
      toToken.price &&
      fromAmount
    ) {
      const fromValue = parseFloat(fromAmount);
      if (!isNaN(fromValue)) {
        const exchangeRate = fromToken.price / toToken.price;
        const toValue = fromValue * exchangeRate;
        setFormData((prev) => ({
          ...prev,
          toAmount: toValue.toFixed(6),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        toAmount: "",
      }));
    }
  }, [formData, formData.fromAmount, formData.fromToken, formData.toToken]);

  const handleFromAmountChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      fromAmount: value,
    }));

    // Clear error when user types
    if (errors.fromAmount) {
      setErrors((prev) => ({
        ...prev,
        fromAmount: "",
      }));
    }
  };

  const handleSelectFromToken = (token: Token) => {
    if (token.symbol === formData.toToken?.symbol) {
      setFormData((prev) => ({
        ...prev,
        fromToken: token,
        toToken: prev.fromToken,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        fromToken: token,
      }));
    }
  };

  const handleSelectToToken = (token: Token) => {
    if (token.symbol === formData.fromToken?.symbol) {
      setFormData((prev) => ({
        ...prev,
        toToken: token,
        fromToken: prev.toToken,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        toToken: token,
      }));
    }
  };

  const handleSwapTokens = () => {
    setIsSwapping(true);
    setSlideDirection("down");

    // Add a small delay to allow the animation to start
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        fromToken: prev.toToken,
        toToken: prev.fromToken,
        fromAmount: prev.toAmount,
        toAmount: prev.fromAmount,
      }));

      // Reset the animation state after swap is complete
      setTimeout(() => {
        setIsSwapping(false);
        setSlideDirection(null);
      }, 10);
    }, 300);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      fromAmount: "",
      general: "",
    };

    if (!formData.fromToken || !formData.toToken) {
      newErrors.general = "Please select tokens for the swap";
      setErrors(newErrors);
      return false;
    }

    if (!formData.fromAmount || parseFloat(formData.fromAmount) <= 0) {
      newErrors.fromAmount = "Please enter a valid amount";
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSwapping(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage(
        `Successfully swapped ${formData.fromAmount} ${formData.fromToken?.symbol} for ${formData.toAmount} ${formData.toToken?.symbol}`
      );

      setFormData((prev) => ({
        ...prev,
        fromAmount: "",
        toAmount: "",
      }));

      setSwapping(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Swap failed:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Swap failed. Please try again.",
      }));
      setSwapping(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const getExchangeRate = (): string => {
    const { fromToken, toToken } = formData;

    if (fromToken && toToken && fromToken.price && toToken.price) {
      const rate = fromToken.price / toToken.price;
      return `1 ${fromToken.symbol} ≈ ${rate.toFixed(6)} ${toToken.symbol}`;
    }

    return "";
  };

  return (
    <div className="card max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Swap Tokens</h2>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => window.location.reload()}
          title="Refresh"
        >
          <FiRefreshCw />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading tokens...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div
              className={`transition-all duration-300 ${
                slideDirection === "down" ? "animate-slide-down" : ""
              }`}
            >
              <TokenSelector
                tokens={tokens}
                selectedToken={formData.fromToken}
                onSelectToken={handleSelectFromToken}
                label="From"
              />

              <AmountInput
                value={formData.fromAmount}
                onChange={handleFromAmountChange}
                token={formData.fromToken}
                label="Amount"
                error={errors.fromAmount}
              />
            </div>

            <div className="relative flex justify-center my-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-t border-gray-700 w-full"></div>
              </div>
              <button
                type="button"
                className={`relative z-10 bg-accent hover:bg-indigo-500 text-white rounded-full p-2 shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent ${
                  isSwapping ? "animate-rotate-180" : ""
                }`}
                onClick={handleSwapTokens}
                disabled={isSwapping}
              >
                <CgArrowsExchangeAltV size={20} />
              </button>
            </div>

            <div
              className={`transition-all duration-300 ${
                slideDirection === "down" ? "animate-slide-up" : ""
              }`}
            >
              <TokenSelector
                tokens={tokens}
                selectedToken={formData.toToken}
                onSelectToken={handleSelectToToken}
                label="To"
              />

              <AmountInput
                value={formData.toAmount}
                onChange={() => {}}
                token={formData.toToken}
                label="You will receive"
                readOnly
              />
            </div>

            {formData.fromToken && formData.toToken && (
              <div className="text-sm text-gray-400 text-right mt-2">
                {getExchangeRate()}
              </div>
            )}

            {errors.general && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full mt-6 flex items-center justify-center"
              disabled={swapping}
            >
              {swapping ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Swapping...
                </>
              ) : (
                "Swap Tokens"
              )}
            </button>
          </div>
        </form>
      )}

      <Modal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        title="Transaction Complete"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 bg-opacity-10">
            <FiCheckCircle className="h-8 w-8 text-green-400 animate-pulse-slow" />
          </div>

          <p className="text-gray-300 mb-6">{successMessage}</p>

          <button
            onClick={closeSuccessModal}
            className="btn-primary w-full py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
