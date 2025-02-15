import { type FormEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { clientAPI } from "~/client/ClientProvider";
import { buttonStyles } from "~/components/styles/button";
import { getUTCWeekDay, modifierArray, toUTCHour } from "~/utils/schedule";
import { searchBarStyles } from "~/components/styles/searchBar";
import Calendar from "~/components/utils/Calendar";
import { useRouter } from "next/navigation";
import { useSelectHours } from "./hooks/useSelectHours";

type ModalAddEventProps = {
    modalRef: React.RefObject<HTMLDialogElement>;
};

export function ModalAddEvent({ modalRef }: ModalAddEventProps) {
    const calendarRef = useRef<HTMLDialogElement>(null);
    const [selectedDateValue, setSelectedDateValue] = useState(new Date());

    const startHourRef = useRef<HTMLSelectElement>(null);
    const endHourRef = useRef<HTMLSelectElement>(null);
    const modifierRef = useRef<HTMLSelectElement>(null);

    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");

    const hourArray = useSelectHours();

    const router = useRouter();

    const { mutate: addEvent } = clientAPI.events.add.useMutation({
        onMutate() {
            toast.loading("Adding");
        },
        onSuccess() {
            setTitleValue("");
            setDescriptionValue("");
            toast.dismiss();
            toast.success("Added");
            router.refresh();
            modalRef.current?.close();
        },
        onError(error) {
            toast.dismiss();
            toast.error(`Error: ${error.message}`);
        },
    });

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const localHourDiff = Math.floor(
            selectedDateValue.getTimezoneOffset() / 60,
        );
        const startHour = toUTCHour(
            parseInt(startHourRef.current?.value ?? ""),
            localHourDiff,
        );
        const endHour = toUTCHour(
            parseInt(endHourRef.current?.value ?? ""),
            localHourDiff,
        );

        if (endHour < startHour || endHour === startHour) {
            return toast.error("Incorrect range");
        }
        if (titleValue === "") {
            return toast.error("Empty title");
        }

        const startDate = new Date(selectedDateValue);
        const endDate = new Date(selectedDateValue);
        startDate.setUTCHours(startHour, 0, 0, 0);
        endDate.setUTCHours(endHour, 0, 0, 0);

        addEvent({
            title: titleValue,
            description: descriptionValue,
            modifier: modifierRef.current?.value,
            startTimestamp: startDate.getTime(),
            endTimestamp: endDate.getTime(),
            weekDay: getUTCWeekDay(startDate),
        });
    }

    return (
        <>
            <dialog
                ref={modalRef}
                className="border p-4 border-slate-500 bg-slate-900 text-slate-50"
            >
                <section className="mb-2 flex items-center">
                    <button
                        onClick={() => modalRef.current?.close()}
                        className={`${buttonStyles} mr-auto`}
                    >
                        Close
                    </button>
                    <h2
                        onClick={() => calendarRef.current?.showModal()}
                        className="mr-auto cursor-pointer"
                    >
                        {selectedDateValue.toUTCString().slice(0, 16)}
                    </h2>
                    <button
                        className={buttonStyles}
                        onClick={() => calendarRef.current?.showModal()}
                    >
                        Set date
                    </button>
                </section>
                <form
                    onSubmit={onSubmit}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            (event.metaKey || event.ctrlKey)
                        ) {
                            onSubmit(event);
                        }
                    }}
                    className="grid-cols-songEdit grid items-center gap-2"
                >
                    <label htmlFor="range-add">Range</label>
                    <div className="flex justify-around">
                        <select
                            ref={startHourRef}
                            className="border border-slate-400 bg-slate-950 p-2"
                            defaultValue="10"
                            id="range-add"
                        >
                            {hourArray.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}:00
                                </option>
                            ))}
                        </select>
                        <select
                            ref={endHourRef}
                            className="border border-slate-400 bg-slate-950 p-2"
                            defaultValue="11"
                            id="select-endhour"
                        >
                            {hourArray.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}:00
                                </option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="modifier-add">Modifier</label>
                    <select
                        id="modifier-add"
                        ref={modifierRef}
                        className="rounded border border-slate-400 bg-slate-950 p-2"
                    >
                        {modifierArray.map((modifier) => (
                            <option key={modifier} value={modifier}>
                                {modifier}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="title-add">Title</label>
                    <input
                        onChange={(event) => setTitleValue(event.target.value)}
                        value={titleValue}
                        id="title-add"
                        className={searchBarStyles}
                        type="text"
                    />
                    <label htmlFor="description-add">Description</label>
                    <textarea
                        onChange={(event) =>
                            setDescriptionValue(event.target.value)
                        }
                        value={descriptionValue}
                        id="description-add"
                        className={searchBarStyles}
                    />
                    <button
                        type="submit"
                        className={`${buttonStyles} col-span-2`}
                    >
                        Add
                    </button>
                </form>
                <Calendar
                    modalRef={calendarRef}
                    selectedDate={selectedDateValue}
                    dateSetter={setSelectedDateValue}
                />
            </dialog>
        </>
    );
}
