function solution(bridge_length, weight, truck_weights) {
  const queue = []; // 다리 위 트럭의 정보를 담고있는 큐
  let bridge_weight = (time = 0); // 다리 위 트럭 무게의 합, 시간

  do {
    if (queue[0] && queue[0].time === time) {
      bridge_weight -= queue.shift().weight;
    }

    if (truck_weights[0] + bridge_weight <= weight) {
      bridge_weight += truck_weights[0];
      queue.push({
        weight: truck_weights[0],
        time: time + bridge_length,
      });
      truck_weights.shift();
    }

    time += 1;
  } while (queue.length > 0);

  return time;
}