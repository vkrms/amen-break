import butt from '@/assets/googl.svg'

type Props = {
    onClick: () => void
}

export const GoogleButton: React.FC<Props> = ({onClick}) => {
    return (
        <button className="gsi-material-button" {...{onClick}}>
            <img src={butt}/>
        </button>
    )
}