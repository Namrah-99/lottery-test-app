import "../styles/styles.css";
export default function Modal({
  headerData,
  isModalOpen,
  setIsModalOpen,
}: {
  headerData: any;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      id="open-modal"
      className={`modal-window ${isModalOpen ? "open" : ""}`}
    >
      <div className="inner-container-style border border-gray-300 p-10 bg-slate-50 shadow">
        <a
          href="#modal-outside"
          title="Close"
          className="modal-close p-2"
          onClick={() => setIsModalOpen(false)}
        >
          ×
        </a>
        <div className="flex flex-col gap-6">
          <p>
            <span className="font-semibold">winningPot:</span>
            {headerData.winningPot}
          </p>
          <p>
            <span className="font-semibold">currentPool:</span>
            {headerData.currentPot}
          </p>
          <p>
            <span className="font-semibold">ticketCount:</span>
            {headerData.ticketCount}
          </p>
        </div>
      </div>
    </div>
  );
}
