"use client";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, MODELS } from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { checkOutSession } from "./action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LoginModal from "@/components/LoginModal";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const DesignPreview = ({
  configuration,
  user,
}: {
  configuration: Configuration;
  user: KindeUser | null;
}) => {
  const { id } = configuration;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => setShowConfetti(true), []);
  const { color, model, finish, material } = configuration;
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const modelLabel = MODELS?.options.find(({ value }) => value === model)
    ?.label!;
  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCTS_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCTS_PRICES.finish.textured;

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: checkOutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "There was an error at our end.Please try again.",
        variant: "destructive",
      });
    },
  });
  const handelCheckout = () => {
    if (user) {
      //create payment session
      createPaymentSession({ configId: id, user });
    } else {
      //user should be login
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{
            spread: 360,
            elementCount: 200,
          }}
        />
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        setIsOpen={setIsLoginModalOpen}
      ></LoginModal>
      <div className="md:grid flex flex-col items-center sm:grid-cols-12 text-sm mt-20 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tw} max-w-[150px] md:max-w-full`)}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
        <div className="mt-6 sm:col-span-9 md:row-end-1 ">
          <h3 className="font-bold text-3xl tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center text-base gap-1.5">
            <Check className="text-blue-500 h-4 w-4" />
            In stock and ready to ship
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className=" mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="text-zinc-950 font-medium">Materials</p>
              <ol className="mt-3 list-disc list-inside text-zinc-700">
                <li>High-quality, duable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-200 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600 ">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {finish === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 ">Textured Finish</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCTS_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}
                {material === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 ">Soft polycarbonate</p>
                    <p className="font-medium text-gray-900 ">
                      {formatPrice(
                        PRODUCTS_PRICES.material.polycarbonate / 100
                      )}
                    </p>
                  </div>
                ) : null}
                <div className="my-2 h-px bg-gray-300"></div>
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order Total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button
                onClick={() => handelCheckout()}
                className="px-4 sm:px-6 lg:px-8 "
              >
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
