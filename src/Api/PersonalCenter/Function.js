import Function from '../../Function';

export function personalCenterPrefix(url)
{
    url = Function.removePrependSlashes(url);
    return Function.requestPrefix(`/personalCenter/${url}`);
}