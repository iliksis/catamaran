export interface ITooltipHeader {
    title: string;
    subTitle?: string;
}

export interface ITooltipBody {
    description: string;
    progress?: ITooltipProgress[];
}

export interface ITooltipProgress {
    progressValue?: number;
    completionValue?: number;
    description: string;
}

export interface ITooltip {
    header: ITooltipHeader;
    body?: ITooltipBody;
}